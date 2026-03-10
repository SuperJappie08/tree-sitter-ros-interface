SomeType[] array
# <- type
#       ^ punctuation.bracket
#        ^ punctuation.bracket
#          ^ variable

uint8[3] my_array [1,2,3]
# <- type.builtin
#    ^ punctuation.bracket
#     ^ number
#      ^ punctuation.bracket
#        ^ variable
#                 ^ punctuation.bracket
#                  ^ number
#                   ^ punctuation.delimiter
#                    ^ number
#                     ^ punctuation.delimiter
#                      ^ number
#                       ^ punctuation.bracket

string<=10[<=2] some_array
# <- type.builtin
#     ^ operator
#       ^ number
#         ^ punctuation.bracket
#          ^ operator
#            ^ number
#             ^ punctuation.bracket
#               ^ variable

string<=10[<=2] some_array_with_defaults [one,two] # Trailing comment
# <- type.builtin
#     ^ operator
#       ^ number
#         ^ punctuation.bracket
#          ^ operator
#            ^ number
#             ^ punctuation.bracket
#               ^ variable
#                                        ^ punctuation.bracket
#                                         ^ string
#                                            ^ punctuation.delimiter
#                                             ^ string
#                                                ^ punctuation.bracket
#                                                  ^ comment

int16[<=9] another_array [2000, -4]
# <- type.builtin
#    ^ punctuation.bracket
#     ^ operator
#       ^ number
#        ^ punctuation.bracket
#          ^ variable
#                        ^ punctuation.bracket
#                          ^ number
#                             ^ punctuation.delimiter
#                               ^ number
#                                 ^ punctuation.bracket
