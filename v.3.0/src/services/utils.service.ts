export class UtilsService {
    /**
     * @param integer number to modulate
     * @param modulus number to modulate over
     * @returns modulo number consistent with other programming languages
     */
    public static modulo(integer: number, modulus: number) {
        return ((integer % modulus) + modulus) % modulus;
    };

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}