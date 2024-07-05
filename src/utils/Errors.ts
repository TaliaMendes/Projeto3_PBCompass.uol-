export const errors = {
  INTERNAL_SERVER_ERROR: {
    code: 500,
    status: 'Internal Server Error',
    message: 'Ocorreu um erro inesperado.'
  },
  INVALID_ID_FORMAT: {
    code: 400,
    status: 'Bad Request',
    message: 'Invalid ID format'
  },
  NOT_FOUND: (message: string) => ({
    code: 404,
    status: 'Not Found',
    message
  }),
  BAD_REQUEST: (message: string) => ({
    code: 400,
    status: 'Bad Request',
    message
  })
};