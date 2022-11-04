const validBody = {
  aString: 'd',
  anInteger: 10,
  anArray: [2, 3]
}

const invalidBody = {
  aString: 'abc',
  anInteger: 1,
  anArray: ['a23bc', 2, 3]
}

const mockedSchema = {
  aString: {
    required: true,
    oneOf: [
      {
        type: 'string',
        pattern: '[def]',
        example: '12132'
      },
      {
        type: 'string',
        pattern: '[ghi]',
        example: 'aasa'
      }
    ]
  },
  anInteger: {
    type: 'integer',
    minimal: 10
  },
  anArray: {
    type: 'array',
    minItems: 2,
    itemsSchema: {
      type: 'integer'
    }
  }
}

const expectedErrors = [
  {
    field: 'aString',
    value: invalidBody.aString,
    requirements: mockedSchema.aString
  },
  {
    field: 'anInteger',
    value: invalidBody.anInteger,
    requirements: mockedSchema.anInteger
  },
  {
    field: 'anArray',
    value: invalidBody.anArray,
    requirements: mockedSchema.anArray
  }
]

module.exports = { validBody, invalidBody, mockedSchema, expectedErrors }
