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
      $.separator,
      field('response', repeat($._statement)),
    ),

    action: $ => seq(
      field('goal', repeat($._statement)),
      $.separator,
      field('result', repeat($._statement)),
      $.separator,
      field('feedback', repeat($._statement)),
    ),

    _statement: $ => choice($.constant, $.field),

    separator: $ => '---',


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

    _type: $ => seq($._base_type, optional($.array)),

    _base_type: $ => choice(
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

    string_type: $ => seq(/w?string/, optional(seq($.upper_bound_specifier, $.integer))),

    array: $ => seq('[', optional(seq(optional($.upper_bound_specifier), $.integer)), ']'),

    upper_bound_specifier: $ => '<=',

    comment: $ => seq(
      '#',
      /.*/,
    ),

    value: $ => choice(
      $.primitive_value,
      $.array_value,
    ),

    primitive_value: $ => choice($.integer, $.string, $.float, $.bool),

    string: $ => choice(
      /"(?:[^"]|\\")*"/,
      /'(:?[^']|\\')*'/,
    ),

    integer: $ => choice($._decimal_integer, $._binary_integer, $._hexadecimal_integer, $._octal_integer),
    _decimal_integer: $ => /[+-]?[0-9_]+/,
    _binary_integer: $ => /[+-]?0[bB][01_]+/,
    _hexadecimal_integer: $ => /[+-]?0[xX][a-f0-9A-F_]+/,
    _octal_integer: $ => /[+-]?0[oO][0-7_]+/,

    float: $ => choice(
      /[+-]?\d+\.\d+(?:[eE][+-]?\d+)?/,
      /[+-]?\d+[eE][+-]?\d+/,
    ),

    bool: $ => choice(
      'True',
      'true',
      'False',
      'false',
    ),

    array_value: $ => seq('[', optional(seq(repeat(seq($.primitive_value, ',')), $.primitive_value)), ']')
  }
});
