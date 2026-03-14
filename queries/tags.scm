; Field
(
  (comment/line_comment)* @doc
  .
  (field name: (identifier) @name) @definition.field
  .
  (comment/inline_comment)* @doc
  (#strip! @doc "^\\s*#\\s*")
  (#select-adjacent! @doc @definition.field)
)

; Constant
(
  (comment/line_comment)* @doc
  .
  (constant name: (const_identifier) @name) @definition.constant
  .
  (comment/inline_comment)* @doc
  (#strip! @doc "^\\s*#\\s*")
  (#select-adjacent! @doc @definition.constant)
)
