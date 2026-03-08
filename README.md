# tree-sitter-ros-interface
`rosmsg`/`ROS Interface` grammar for tree-sitter.

Designed based on the [`rosidl` parser implementation](https://github.com/ros2/rosidl/blob/rolling/rosidl_adapter/rosidl_adapter/parser.py).

## Current limitations:
The following features are still missing:
 - `@optional` support
 - Unquoted defaults strings
 - A lot of testing
 - Extra queries

## Inspired by
 - [`jtbandes/ros-tmlanguage`](https://github.com/jtbandes/ros-tmlanguage)
 - [`ErickKramer/nvim-ros2`](https://github.com/ErickKramer/nvim-ros2)
