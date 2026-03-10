std_msgs/Header header
# <- type
#               ^ variable

@optional
# <- function
bool manual
# <- type.builtin
#    ^ variable
@optional string mode @optional
# <- function
#         ^ type.builtin
#                ^ variable
#                     ^ string
uint8 status
# <- type.builtin
#     ^ variable

string MODE_SIMPLE = SIMPLE
# <- type.builtin
#      ^ constant
#                  ^ operator
#                    ^ string
string MODE_ADVANCED = ADVANCED
# <- type.builtin
#      ^ constant
#                    ^ operator
#                      ^ string
string MODE_SUPER_ADVANCED = SUPER_ADVANCED
# <- type.builtin
#      ^ constant
#                          ^ operator
#                            ^ string
