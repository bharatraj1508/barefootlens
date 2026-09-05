// Module-singleton client state that survives SPA navigation, used to hand
// off the poster-morph flight and to suppress the iris on Films → detail.

export type MorphState = {
  src: string;
  slug: string;
  rect: { top: number; left: number; width: number; height: number };
} | null;

export const transition: { morph: MorphState; skipIris: boolean } = {
  morph: null,
  skipIris: false,
};
