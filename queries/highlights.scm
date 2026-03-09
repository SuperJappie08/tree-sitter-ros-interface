; Identifier

(comment) @comment

; field
(field name: (identifier) @variable)
(field type: (custom_type) @type)
(field type: (external_custom_type) @type)
; Make test to check if necessary
;(field type: (primitive_type) @type.builtin)

; constant
(const_identifier) @constant

; Types

; TODO: Still needs work
(primitive_type) @type.builtin

;(custom_type) @type
;(external_custom_type) @type

; values
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

(separator) @punctuation.delimiter

[
  "["
  "]"
] @punctuation.bracket

[
  (upper_bound_specifier)
  (constant_separator)
] @operator
