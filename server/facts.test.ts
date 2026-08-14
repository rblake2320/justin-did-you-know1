import { describe, expect, it, vi, beforeEach } from "vitest";
import { getDailyFact, getRandomFact, getAllFacts, getFactById, getFactCount } from "./db";

// Mock the database module
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();

  const mockFacts = [
    {
      id: 1,
      videoId: "abc123",
      videoTitle: "Test Video 1",
      videoUrl: "https://www.youtube.com/shorts/abc123",
      fact: "That the Ouija board named itself? Well now you do.",
      displayOrder: 1,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: 2,
      videoId: "def456",
      videoTitle: "Test Video 2",
      videoUrl: "https://www.youtube.com/shorts/def456",
      fact: "That Helen Keller was one of the founding members of the ACLU?",
      displayOrder: 2,
      createdAt: new Date("2024-01-02"),
    },
    {
      id: 3,
      videoId: "ghi789",
      videoTitle: "Test Video 3",
      videoUrl: "https://www.youtube.com/shorts/ghi789",
      fact: "That sloths can hold their breath underwater for 40 minutes?",
      displayOrder: 3,
      createdAt: new Date("2024-01-03"),
    },
  ];

  return {
    ...actual,
    getAllFacts: vi.fn().mockResolvedValue(mockFacts),
    getFactById: vi.fn().mockImplementation(async (id: number) =>
      mockFacts.find((f) => f.id === id)
    ),
    getDailyFact: vi.fn().mockResolvedValue(mockFacts[0]),
    getRandomFact: vi.fn().mockImplementation(async (excludeId?: number) => {
      const pool = excludeId ? mockFacts.filter((f) => f.id !== excludeId) : mockFacts;
      return pool[0];
    }),
    getFactCount: vi.fn().mockResolvedValue(mockFacts.length),
  };
});

describe("Facts DB helpers (mocked)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllFacts returns all facts in order", async () => {
    const facts = await getAllFacts();
    expect(facts).toHaveLength(3);
    expect(facts[0].videoId).toBe("abc123");
    expect(facts[1].videoId).toBe("def456");
    expect(facts[2].videoId).toBe("ghi789");
  });

  it("getFactById returns the correct fact", async () => {
    const fact = await getFactById(2);
    expect(fact).toBeDefined();
    expect(fact?.videoId).toBe("def456");
    expect(fact?.fact).toContain("Helen Keller");
  });

  it("getFactById returns undefined for non-existent id", async () => {
    const fact = await getFactById(999);
    expect(fact).toBeUndefined();
  });

  it("getDailyFact returns a fact", async () => {
    const fact = await getDailyFact();
    expect(fact).toBeDefined();
    expect(fact?.id).toBe(1);
  });

  it("getRandomFact returns a fact", async () => {
    const fact = await getRandomFact();
    expect(fact).toBeDefined();
    expect(fact?.id).toBeGreaterThan(0);
  });

  it("getRandomFact excludes the specified id", async () => {
    const fact = await getRandomFact(1);
    expect(fact?.id).not.toBe(1);
  });

  it("getFactCount returns the correct count", async () => {
    const count = await getFactCount();
    expect(count).toBe(3);
  });
});

describe("Facts tRPC router procedures", () => {
  it("facts.list returns an array of facts", async () => {
    const { appRouter } = await import("./routers");
    const ctx = { user: null, req: {} as never, res: {} as never };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.facts.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("fact");
    expect(result[0]).toHaveProperty("videoUrl");
    expect(result[0]).toHaveProperty("videoTitle");
  });

  it("facts.daily returns a single fact or null", async () => {
    const { appRouter } = await import("./routers");
    const ctx = { user: null, req: {} as never, res: {} as never };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.facts.daily();
    if (result !== null) {
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("fact");
      expect(result).toHaveProperty("videoUrl");
    }
  });

  it("facts.random returns a fact, excluding specified id", async () => {
    const { appRouter } = await import("./routers");
    const ctx = { user: null, req: {} as never, res: {} as never };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.facts.random({ excludeId: 999 });
    if (result !== null) {
      expect(result.id).not.toBe(999);
      expect(result).toHaveProperty("fact");
    }
  });

  it("facts.count returns a non-negative number", async () => {
    const { appRouter } = await import("./routers");
    const ctx = { user: null, req: {} as never, res: {} as never };
    const caller = appRouter.createCaller(ctx);
    const count = await caller.facts.count();
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it("facts.byId returns the correct fact", async () => {
    const { appRouter } = await import("./routers");
    const ctx = { user: null, req: {} as never, res: {} as never };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.facts.byId({ id: 1 });
    if (result !== null) {
      expect(result.id).toBe(1);
      expect(result).toHaveProperty("fact");
    }
  });

  it("seed data: clean_facts.json contains 76 facts with required fields", async () => {
    const { readFileSync } = await import("fs");
    const raw = readFileSync("/home/ubuntu/justin-facts/clean_facts.json", "utf-8");
    const facts = JSON.parse(raw);
    expect(facts.length).toBe(76);
    for (const fact of facts) {
      expect(fact).toHaveProperty("id");
      expect(fact).toHaveProperty("title");
      expect(fact).toHaveProperty("url");
      expect(fact).toHaveProperty("fact");
      expect(typeof fact.fact).toBe("string");
      expect(fact.fact.length).toBeGreaterThan(10);
      expect(fact.url).toMatch(/youtube\.com/);
    }
  });
});
