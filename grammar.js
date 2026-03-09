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
    $.comment,
    /\s+/
  ],

  rules: {
    source_file: $ => choice(
      field('message', seq(repeat(seq($._statement, $._newline)), optional($._statement))),
      $.service,
      $.action,
    ),

    service: $ => seq(
      field('request', repeat(seq($._statement, $._newline))),
      $.separator,
      field('response', seq(repeat(seq($._statement, $._newline)), optional($._statement))),
    ),

    action: $ => seq(
      field('goal', repeat(seq($._statement, $._newline))),
      $.separator,
      field('result', repeat(seq($._statement, $._newline))),
      $.separator,
      field('feedback', seq(repeat(seq($._statement, $._newline)), optional($._statement))),
    ),

    _statement: $ => choice($.constant, $.field),

    separator: $ => '---',


    // TODO: @OPTIONAL
    field: $ => choice($._scalar_field, $._array_field),

    _scalar_field: $ => seq(
      field('type', $._base_type),
      field('name', $.identifier),
      optional(field('default', $._primitive_value)),
    ),

    _array_field: $ => seq(
      field('type', seq($._base_type, $.array)),
      field('name', $.identifier),
      optional(field('default', $.array_value)),
    ),

    constant: $ => seq(
      field('type', $.primitive_type),
      field('name', $.const_identifier),
      '=',
      field('value', $._primitive_value),
    ),

    identifier: $ => /[a-z](?:[a-z0-9_]?[a-z0-9]+)*/,

    const_identifier: $ => /[A-Z](?:[A-Z0-9_]?[A-Z0-9]+)*/,

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

    _primitive_value: $ => choice($._simple_primitive_value, $.string),

    _simple_primitive_value: $ => choice($.integer, $.float, $.bool),

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

    _array_content_value: $ => choice(
      $._simple_primitive_value,
      $.array_string
    ),

    array_string: $ => choice(
      $._quoted_string,
      /(?:[^\s"',\]#]|\\"|\\')(?:[^\r\n"',\]#]|\\"|\\')*/,
    ),

    array_value: $ => seq(
      '[',
      optional(seq(
        repeat(seq($._array_content_value, ',', $._whitespace)),
        $._array_content_value
      )),
      ']'
    ),

    string: $ => choice(
      $._quoted_string,
      /(?:[^\s"'#]|\\"|\\')(?:[^\r\n"'#]|\\"|\\')*/,
    ),

    _quoted_string: $ => choice(
      /"(?:[^"]|\\")*"/,
      /'(?:[^']|\\')*'/,
    ),

    _whitespace: $ => /[ \t]+/,
    _newline: $ => /(\r?\n)/
  }
});
