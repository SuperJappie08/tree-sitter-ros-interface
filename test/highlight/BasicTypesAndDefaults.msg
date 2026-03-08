bool bool_value
# <- type.builtin
#    ^ variable
bool bool_default true
# <- type.builtin
#    ^ variable
#                 ^ constant.builtin

byte byte_value
# <- type.builtin
#    ^ variable
byte byte_default 1
# <- type.builtin
#    ^ variable
#                 ^ number

char char_value
# <- type.builtin
#    ^ variable
byte char_default 0x01
# <- type.builtin
#    ^ variable
#                 ^ number

float64 float64_value
# <- type.builtin
#       ^ variable
float64 float64_default1 10.4
# <- type.builtin
#       ^ variable
#                        ^ number
float64 float64_default2 +20.4e-4
# <- type.builtin
#       ^ variable
#                        ^ number
float64 float64_default3 -20e+4
# <- type.builtin
#       ^ variable
#                        ^ number

uint8 uint8_value 0b00010001
# <- type.builtin
#     ^ variable
#                 ^ number
int32 int32_value -0xFF
# <- type.builtin
#     ^ variable
#                 ^ number
uint32 uint32_value 0o77
# <- type.builtin
#      ^ variable
#                   ^ number

string some_string
# <- type.builtin
#      ^ variable
string some_string_default "uint8\' # This is still string" # This should work
# <- type.builtin
#      ^ variable
#                          ^ string
#                                   ^ string
#                                                           ^ comment

string<=80 some_bound_string 'this is a string aswell' # Some comment
# <- type.builtin
#     ^ operator
#       ^ number
#          ^ variable
#                            ^ string
#                                                      ^ comment
