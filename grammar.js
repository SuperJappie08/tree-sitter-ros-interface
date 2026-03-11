/**
 * @file ROS Interface grammar for tree-sitter
 * @author Jasper van Brakel
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const ANNOTATIONS = [
  'optional',
];

export default grammar({
  name: "ros_interface",

  extras: $ => [
    $.comment,
    /\s+/
  ],

  rules: {
    source_file: $ => choice(
      alias(seq(repeat(seq($._statement, $._newline)), optional($._statement)), $.message),
      $.service,
      $.action,
    ),

    service: $ => seq(
      alias(repeat(seq($._statement, $._newline)), $.request),
      $.separator,
      alias(seq(repeat(seq($._statement, $._newline)), optional($._statement)), $.response),
    ),

    action: $ => seq(
      alias(repeat(seq($._statement, $._newline)), $.goal),
      $.separator,
      alias(repeat(seq($._statement, $._newline)), $.result),
      $.separator,
      alias(seq(repeat(seq($._statement, $._newline)), optional($._statement)), $.feedback),
    ),

    _statement: $ => choice($.constant, $.field),

    separator: $ => '---',

    field: $ => seq(
      // Repeating a single annotation is not allowed, however allow multiple to be future proof
      repeat($.annotation),
      choice($._scalar_field, $._array_field)
    ),

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
      repeat($.annotation),
      field('type', $.primitive_type),
      field('name', $.const_identifier),
      $.constant_separator,
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

    upper_bound_specifier: $ => token.immediate('<='),

    constant_separator: $ => '=',

    comment: $ => seq(
      '#',
      /.*/,
    ),

    annotation: $ => seq(
      '@',
      token.immediate(field('kind', as_choice(...ANNOTATIONS))),
    ),

    _primitive_value: $ => choice($._simple_primitive_value, $.string),

    _simple_primitive_value: $ => choice($.integer, $.float, $.bool),

    integer: $ => choice($._decimal_integer, $._binary_integer, $._hexadecimal_integer, $._octal_integer),
    _decimal_integer: $ => /[+-]?[0-9_]+/,
    _binary_integer: $ => /[+-]?0[bB][01_]+/,
    _hexadecimal_integer: $ => /[+-]?0[xX][a-f0-9A-F_]+/,
    _octal_integer: $ => /[+-]?0[oO][0-7_]+/,

    float: $ => choice(
      /[+-]?\d+\.\d*(?:[eE][+-]?\d+)?/,
      /[+-]?\d+\.?[eE][+-]?\d+/,
    ),

    bool: $ => choice(
      'True',
      'true',
      'False',
      'false',
    ),

    array_value: $ => seq(
      '[',
      optional(seq(
        repeat(seq($._array_content_value, ',')),
        $._array_content_value
      )),
      ']'
    ),

    _array_content_value: $ => choice(
      $._simple_primitive_value,
      $.array_string
    ),

    array_string: $ => choice(
      $._quoted_string,
      // Short string
      /(?:[^\s"',\]#]|\\"|\\'){1,2}/,
      // Long strings
      /(?:[^\s"',\]#]|\\"|\\')(?:[^\r\n"',\]#]|\\"|\\')+(?:[^\s"',\]#]|\\"|\\')/,
    ),

    string: $ => choice(
      $._quoted_string,
      // Short string
      /(?:[^\s"'#]|\\"|\\'){1,2}/,
      // Long strings
      /(?:[^\s"'#]|\\"|\\')(?:[^\r\n"'#]|\\"|\\')+(?:[^\s"'#]|\\"|\\')/,
    ),

    _quoted_string: $ => choice(
      /"(?:[^"]|\\")*"/,
      /'(?:[^']|\\')*'/,
    ),

    _whitespace: $ => /[ \t]+/,
    _newline: $ => /(\r?\n)/
  }
});

/// Helper functions
/**
 * @param {RuleOrLiteral[]} args
 */
function as_choice(...args) {
  if (args.length > 1) {
    return choice(...args);
  } else {
    return args[0]
  }
}
