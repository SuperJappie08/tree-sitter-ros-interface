; NOTE(SuperJappie08): This is currently the most reliable way
;                      to move between message parts.
(separator) @class.around

; Field
(field name: (identifier) @function.movement default: (_)? @function.inside) @function.around

; Constant
(constant name: (const_identifier) @function.movement value: (_) @function.inside) @function.around

; Array Values
(array_value
  ((_) @parameter.inside . ","? @parameter.around) @parameter.around)

; Comment
(comment) @comment.inside
(comment)+ @comment.around
