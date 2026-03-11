# Custom Types
# <- comment

ConfusingStrings simple_field
# <- type
#                ^ variable
std_msgs/Header simple_external_field
# <- type
#       ^ type
#        ^ type
#               ^ variable

ConfusingStrings[] simple_field_list
# <- type
#               ^ punctuation.bracket
#                ^ punctuation.bracket
#                  ^ variable
std_msgs/Header[] simple_external_field_list
# <- type
#       ^ type
#        ^ type
#              ^ punctuation.bracket
#               ^ punctuation.bracket
#                 ^ variable

ConfusingStrings[9] simple_field_array
# <- type
#               ^ punctuation.bracket
#                ^ number
#                 ^ punctuation.bracket
#                   ^ variable
std_msgs/Header[9] simple_external_field_array
# <- type
#       ^ type
#        ^ type
#              ^ punctuation.bracket
#               ^ number
#                ^ punctuation.bracket
#                  ^ variable

ConfusingStrings[<=9] simple_field_bounded_array
# <- type
#               ^ punctuation.bracket
#                ^ operator
#                  ^ number
#                   ^ punctuation.bracket
#                     ^ variable
std_msgs/Header[<=9] simple_external_field_bounded_array
# <- type
#       ^ type
#        ^ type
#              ^ punctuation.bracket
#               ^ operator
#                 ^ number
#                  ^ punctuation.bracket
#                    ^ variable
