import type { JSONSchema7, JSONSchema7Definition } from 'json-schema';

const implicitDependencyEntry: JSONSchema7Definition = {
  type: 'object',
  additionalProperties: {
    oneOf: [
      { enum: ['*'] },
      { type: 'array', items: { type: 'string' } },
      { $ref: '#/definitions/implicitJsonSubsetDependency' },
    ],
  },
};

const implicitJsonSubsetDependency: JSONSchema7Definition = {
  type: 'object',
  additionalProperties: {
    oneOf: [
      { enum: ['*'] },
      { type: 'array', items: { type: 'array' } },
      { $ref: '#/definitions/implicitJsonSubsetDependency' },
    ],
  },
};

const nxAffectedConfigDef: JSONSchema7Definition = {
  type: 'object',
  properties: {
    defaultBase: {
      type: 'string',
      description: 'Default based branch used by affected commands.',
    },
  },
  additionalProperties: false,
};

const nxJsonConfigDef: JSONSchema7Definition = {
  type: 'object',
  description: 'Nx.json configuration',
  properties: {
    implicitDependencies: {
      $ref: '#/definitions/implicitDependencyEntry',
    },
    npmScope: {
      type: 'string',
    },
    affected: {
      $ref: '#/definitions/nxAffectedConfigDef',
    },
    projects: {
      type: 'object',
      additionalProperties: {
        $ref: '#/definitions/nxJsonProjectConfigDef',
      },
    },
    workspaceLayout: {
      type: 'object',
      properties: {
        libsDir: { type: 'string' },
        appsDir: { type: 'string' },
      },
      additionalProperties: false,
    },
    tasksRunnerOptions: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: {
          runner: { type: 'string' },
          options: { type: 'object', additionalProperties: true },
        },
        additionalProperties: false,
        required: ['runner'],
      },
    },
  },
  required: ['implicitDependencies', 'npmScope', 'projects'],
};

const nxJsonProjectConfigDef: JSONSchema7Definition = {
  type: 'object',
  properties: {
    implicitDependencies: { type: 'array', items: { type: 'string' } },
    tags: { type: 'array', items: { type: 'string' } },
  },
  additionalProperties: false,
};

const nxJsonSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    implicitDependencyEntry,
    implicitJsonSubsetDependency,
    nxAffectedConfigDef,
    nxJsonConfigDef,
    nxJsonProjectConfigDef,
  },
  $ref: '#/definitions/nxJsonConfigDef',
};

export default {
  'nx.schema.json': nxJsonSchema,
};
