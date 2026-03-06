/**
 * @file ROS Interface grammar for tree-sitter
 * @author Jasper van Brakel
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "ros_interface",

  extras: $ => [
    /\s/,
    $.comment
  ],

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => choice(
      field('message', repeat($._statement)),
      $.service,
      $.action,
    ),

    service: $ => seq(
      field('request', repeat($._statement)),
      $._seperator,
      field('response', repeat($._statement)),
    ),

    action: $ => seq(
      field('goal', repeat($._statement)),
      $._seperator,
      field('result', repeat($._statement)),
      $._seperator,
      field('feedback', repeat($._statement)),
    ),

    _statement: $ => choice($.constant, $.field),

    _seperator: $ => '---',


    // TODO: DOC COMMENTS?
    // TODO: @OPTIONAL
    field: $ => seq(
      field('type', $._type),
      field('name', $.identifier),
      optional(field('default', $.field_default)),
    ),

    constant: $ => seq(
      field('type', $.primitive_type),
      field('name', $.const_identifier),
      '=',
      field('value', $.primitive_value),
    ),

    identifier: $ => /[a-z](?:[a-z0-9_]?[a-z0-9]+)*/,

    const_identifier: $ => /[A-Z](?:[A-Z0-9_]?[A-Z0-9]+)*/,

    field_default: $ => $.value,

    _type: $ => seq($.base_type, optional($.array)),

    base_type: $ => choice(
      $.primitive_type,
      $.custom_type,
      $.external_custom_type,
    ),

    custom_type: $ => /[A-Z][A-Za-z0-9]*/,

    package_specifier: $ => new RustRegex('([a-z](?:[a-z0-9_]?[a-z0-9]+)*)/'),

    external_custom_type: $ => seq($.package_specifier, $.custom_type),

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

    string_type: $ => seq(/w?string/, optional(seq('<=', /\d+/))),

    array: $ => seq('[', optional(token.immediate(seq(optional('<='), /\d+/))), ']'),

    // _length: $ => token.immediate(/\d+/),

    comment: $ => seq(
      '#',
      /.*/,
    ),

    value: $ => choice(
      $.primitive_value,
      $.array_value,
    ),

    primitive_value: $ => choice($.int_value, $.string, $.float, $.bool),

    string: $ => choice(/".*"/, /'.*'/),

    // TODO: FIGURE OUT IF + is allowed????
    int_value: $ => /-?\d+/,

    float: $ => /[+-]?\d+\.\d+/,

    bool: $ => choice(
      'True',
      'true',
      '1',
      'False',
      'false',
      '0',
    ),

    array_value: $ => seq('[', optional(seq(repeat(seq($.primitive_value, ',')), $.primitive_value)), ']')
  }
});
