const mockExpress = () => {
  const request = {
    body: {},
    query: {},
    params: {},
    headers: {}
  }

  const response = {}

  response.status = jest.fn().mockReturnValue(response)
  response.json = jest.fn().mockReturnValue(response)

  return { request, response, next: jest.fn() }
}

module.exports = { mockExpress }
