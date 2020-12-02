import type { JSONSchema7, JSONSchema7Definition } from 'json-schema';

const workspaceConfigDef: JSONSchema7Definition = {
  type: 'object',
  description: 'Workspace configuration',
  properties: {
    version: {
      type: 'number',
    },
    projects: {
      type: 'object',
      description: "Projects' configurations",
      additionalProperties: { $ref: '#/definitions/projectConfigDef' },
    },
    defaultProject: {
      type: 'string',
      description:
        "Default project. When project isn't provided, the default project will be used. Convenient for small workspaces with one main application.",
    },
    schematics: {
      type: 'object',
      description:
        'List of default values used by generators.\n\nThese defaults are global. They are used when no other defaults are configured.',
      additionalProperties: {
        type: 'object',
        additionalProperties: true,
      },
    },
    cli: {
      type: 'object',
      description:
        'Default generator collection. It is used when no collection is provided.',
      properties: { defaultCollection: { type: 'string' } },
    },
  },
  required: ['version', 'projects'],
};

const projectConfigDef: JSONSchema7Definition = {
  type: 'object',
  description: 'Project configuration',
  properties: {
    root: {
      type: 'string',
      description: "Project's location relative to the root of the workspace",
    },
    sourceRoot: {
      type: 'string',
      description:
        "The location of project's sources relative to the root of the workspace",
    },
    projectType: {
      type: 'string',
      description: 'Project type',
      enum: ['library', 'application'],
    },
    schematics: {
      type: 'object',
      description:
        'List of default values used by generators.\n\nThese defaults are scoped to a project. They override global defaults.',
      additionalProperties: {
        type: 'object',
        additionalProperties: true,
      },
    },
    architect: {
      type: 'object',
      description: "Project's targets",
      additionalProperties: { $ref: '#/definitions/targetConfigDef' },
    },
  },
  required: ['root'],
};

const targetConfigDef: JSONSchema7Definition = {
  type: 'object',
  description: "Target's configuration",
  properties: {
    builder: {
      type: 'string',
      description: 'The executor/builder used to implement the target.',
    },
    options: {
      type: ['number', 'string', 'boolean', 'object', 'array', 'null'],
      description: "Target's options. They are passed in to the executor.",
    },
    configurations: {
      type: 'object',
      description: 'Sets of options',
      additionalProperties: {
        type: 'object',
        additionalProperties: true,
      },
    },
    outputs: {
      type: 'array',
      description:
        "List of the target's outputs. The outputs will be cached by the Nx computation caching engine.",
      items: { type: 'string' },
    },
  },
  required: ['builder'],
};

const workspaceSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    workspaceConfigDef,
    projectConfigDef,
    targetConfigDef,
  },
  $ref: '#/definitions/workspaceConfigDef',
};

export default {
  'workspace.schema.json': workspaceSchema,
};
