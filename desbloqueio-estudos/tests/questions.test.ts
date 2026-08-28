import { describe, expect, it } from "vitest";
import { updateStreak } from "../lib/questions";

describe("regra de desbloqueio", () => {
  it("avança até três acertos", () => {
    expect(updateStreak(0, true)).toBe(1);
    expect(updateStreak(1, true)).toBe(2);
    expect(updateStreak(2, true)).toBe(3);
    expect(updateStreak(3, true)).toBe(3);
  });

  it("zera a sequência quando a resposta está errada", () => {
    expect(updateStreak(2, false)).toBe(0);
    expect(updateStreak(3, false)).toBe(0);
  });
});
