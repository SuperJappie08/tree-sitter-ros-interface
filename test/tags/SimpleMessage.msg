# This is a file-level doc-comment

# This is a field-level doc-comment
uint8 field1  # This is a inline field-level doc-comment
              # Which should continue field-level doc-comment
#     ^ definition.field

# This is a field-level doc-comment
uint8 field2  # This is a inline field-level doc-comment
#     ^ definition.field

# This is a field-level doc-comment
string<=99 field3 'a random string' # This is a inline field-level doc-comment
#          ^ definition.field

# This is a field-level doc-comment
uint8 NUM_CONST_ONE = 1 # This is a inline field-level doc-comment
#     ^ definition.constant

string NUM_CONST_TWO = A random string
#      ^ definition.constant
