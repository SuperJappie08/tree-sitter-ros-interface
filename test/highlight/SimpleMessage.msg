# This is a file-level doc-comment
# <- comment

# This is a field-level doc-comment
uint8 field1  # This is a inline field-level doc-comment
              # Which should uint8 continue field-level doc-comment
#               ^ comment
#                            ^ comment

# This is a field-level doc-comment
# <- comment
uint8 field2  # This is a inline field-level doc-comment
# <- type.builtin
#     ^ variable
#             ^ comment

# This is a field-level doc-comment
# <- comment
string<=99 field3 'a random string' # This is a inline field-level doc-comment
# <- type.builtin
#     ^ operator
#       ^ number
#          ^ variable
#                 ^ string
#                                   ^ comment

# This is a field-level doc-comment
# <- comment
uint8 NUM_CONST_ONE = 1 # This is a inline field-level doc-comment
# <- type.builtin
#     ^ constant
#                   ^ operator
#                     ^ number
#                       ^ comment

string NUM_CONST_TWO = A random string
# <- type.builtin
#      ^ constant
#                    ^ operator
#                      ^ string
#                        ^ string
#                               ^ string
