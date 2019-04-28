export default {
    create: jest.fn(() => {
        return {
            get: jest.fn(() => Promise.resolve({ data: {}, status: 200 })),
            post: jest.fn(() => Promise.resolve({ data: {}, status: 204 }))
        };
    })
};
