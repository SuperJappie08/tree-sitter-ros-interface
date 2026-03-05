/**
 * @file ROS Interface grammar for tree-sitter
 * @author Jasper van Brakel
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "ros_interface",

  extras: $ => [$.comment, /\s/],

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => seq($.field),

    field: $ => seq($._type, " "),

    _type: $ => seq($.base_type, optional($.array)),

    base_type: $ => choice($.primitive_type),

    primitive_type: $ => choice(
      'bool',
      'byte',
      'char',
      new RustRegex('float(?:32|64)'),
      new RustRegex('u?int(?:8|16|32|64)'),
      $.string_type,
      'duration',
      'time'
    ),

    string_type: $ => seq(/w?string/, optional(seq('<=', $.length))),

    array: $ => seq('[', optional(seq(optional('<='), $.length)), ']'),

    length: $ => /\d+/,

    comment: $ => seq('#', /.*/)
  }
});
