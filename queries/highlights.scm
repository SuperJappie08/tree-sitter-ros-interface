; Identifier

(comment) @comment

; field
(field name: (identifier) @variable)
(field type: (custom_type) @type)
(field type: (external_custom_type) @type)

; Types
(primitive_type) @type.builtin

; Annotations such as @optional
(annotation) @function

; constant
(const_identifier) @constant

; Values
[
  (string)
  (array_string)
] @string

(bool) @constant.builtin

[
  (float)
  (integer)
] @number

; Other
; Service/Action delimiter
(separator) @punctuation.delimiter

[
  "["
  "]"
] @punctuation.bracket

; Array value delimiter
"," @punctuation.delimiter

[
  (upper_bound_specifier)
  (constant_separator)
] @operator
