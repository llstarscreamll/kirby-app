import { flatApiErrors } from "./common-functions";

describe('flatApiErrors', () => {
    it('should return array of errors', () => {
        const result = flatApiErrors({
            message: 'Invalid data!!',
            errors: {
                email: [
                    'Email does not exists.',
                    'Email has no valid format.',
                ],
                password: ['Password too short.']
            }
        });

        expect(result).toEqual([
            'Email does not exists.',
            'Email has no valid format.',
            'Password too short.'
        ]);
    });
});
