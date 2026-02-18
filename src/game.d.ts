/**
 * @file
 * Interfaces that the Margonem game uses.
 *
 * It might not be a 1:1 match with the actual game,
 * since the source code is not available,
 * but it should be enough for our purposes.
 *
 * The addon mostly uses interfaces from this file to type-hint the
 * used methods from the game's code.
 * Without this file, the same structures would need to be used,
 * just without any type-hinting.
 *
 * The interfaces are purposefully not complete,
 * as only the parts used in the addon are described.
 */

declare const INTERFACE: "NI" | "SI";
