const validBody = {
    aString: 'abs',
    anInteger: 10,
    anArray: [2, 3]
  }

const invalidBody = {
  aString: 'a1f2rf',
  anInteger: 1,
  anArray: ['a23bc', 2, 3]
}

const mockedSchema = {
  aString: {
    oneOf: [
      {
        type: 'string',
        pattern: '\\W',
        example: '12132'
      },
      {
        type: 'string',
        pattern: '\\D',
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
    validations: mockedSchema.aString
  },
  {
    field: 'anInteger',
    value: invalidBody.anInteger,
    validations: mockedSchema.anInteger
  },
  {
    field: 'anArray',
    value: invalidBody.anArray,
    validations: mockedSchema.anArray
  }
]

module.exports = { validBody, invalidBody, mockedSchema, expectedErrors}
