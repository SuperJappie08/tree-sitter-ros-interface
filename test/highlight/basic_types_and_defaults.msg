bool bool_value
# <- type.builtin
#    ^ identifier
bool bool_default true
# <- type.builtin
#    ^ identifier
#                 ^ constant.builtin

byte byte_value
# <- type.builtin
#    ^ identifier
byte byte_default 1
# <- type.builtin
#    ^ identifier
#                 ^ number

char char_value
# <- type.builtin
#    ^ identifier
byte char_default 0x01
# <- type.builtin
#    ^ identifier
#                 ^ number
float64 float64_value
# <- type.builtin
#       ^ identifier
uint8 uint8_value
# <- type.builtin
#     ^ identifier
int32 int32_value
# <- type.builtin
#     ^ identifier
uint32 uint32_value
# <- type.builtin
#      ^ identifier

string some_string
# <- type.builtin
#      ^ identifier
string<=3 some_string
# <- type.builtin
#       ^ number
#         ^ identifier
