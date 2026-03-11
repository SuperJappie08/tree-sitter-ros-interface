int16 response
# <- type.builtin
#     ^ variable

int16 DECIMAL_CONST = 10
# <- type.builtin
#     ^ constant
#                   ^ operator
#                     ^ number
int16 DECIMAL_CONST_NEG = -10
# <- type.builtin
#     ^ constant
#                       ^ operator
#                         ^ number

# Binary
int16 BINARY_CONST = 0b1010
# <- type.builtin
#     ^ constant
#                  ^ operator
#                    ^ number
int16 BINARY_CONST_NEG = -0b1010
# <- type.builtin
#     ^ constant
#                      ^ operator
#                        ^ number
int16 BINARY_CONST_ALT = 0B1010
# <- type.builtin
#     ^ constant
#                      ^ operator
#                        ^ number
int16 BINARY_CONST_ALT_NEG = -0B1010
# <- type.builtin
#     ^ constant
#                          ^ operator
#                            ^ number


# Hexadecimal
int16 HEXADECIMAL_CONST = 0xA
# <- type.builtin
#     ^ constant
#                       ^ operator
#                         ^ number
int16 HEXADECIMAL_CONST_NEG = -0xA
# <- type.builtin
#     ^ constant
#                           ^ operator
#                             ^ number
int16 HEXADECIMAL_CONST_ALT1 = 0Xa
# <- type.builtin
#     ^ constant
#                            ^ operator
#                              ^ number
int16 HEXADECIMAL_CONST_ALT2 = 0xa
# <- type.builtin
#     ^ constant
#                            ^ operator
#                              ^ number
int16 HEXADECIMAL_CONST_ALT3 = 0XA
# <- type.builtin
#     ^ constant
#                            ^ operator
#                              ^ number
int16 HEXADECIMAL_CONST_ALT1_NEG = -0Xa
# <- type.builtin
#     ^ constant
#                                ^ operator
#                                  ^ number
int16 HEXADECIMAL_CONST_ALT2_NEG = -0xa
# <- type.builtin
#     ^ constant
#                                ^ operator
#                                  ^ number
int16 HEXADECIMAL_CONST_ALT3_NEG = -0XA
# <- type.builtin
#     ^ constant
#                                ^ operator
#                                  ^ number

# Octal
int16 OCTAL_CONST = 0o12
# <- type.builtin
#     ^ constant
#                 ^ operator
#                   ^ number
int16 OCTAL_CONST_NEG = -0o12
# <- type.builtin
#     ^ constant
#                     ^ operator
#                       ^ number
int16 OCTAL_CONST_ALT = 0O12
# <- type.builtin
#     ^ constant
#                     ^ operator
#                       ^ number
int16 OCTAL_CONST_ALT_NEG = -0O12
# <- type.builtin
#     ^ constant
#                         ^ operator
#                           ^ number
