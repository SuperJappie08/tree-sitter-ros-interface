# Using with Helix <!-- omit in toc -->
This grammar can be used with Helix when using the [described setup](#setup).

It supports:
 - Syntax Highlighting
 - Tree sitter movements:
   - Comment
   - **Function**al parts of message
      - Outside: field/constant
      - Inside: default/value
    - Parameter: array elements
    - Type Definition: Moves is the message separator (in services and actions)

# Setup <!-- omit in toc -->
Using this grammar with Helix requires a few steps;
- [1. Setup `languages.toml`](#1-setup-languagestoml)
- [2. Setup Queries](#2-setup-queries)
  - [2.1 Patch Highlighting](#21-patch-highlighting)

## 1. Setup `languages.toml`
Add the following to your Helix user `languages.toml` (often in `~/.config/helix/languages.toml`)

```toml
### This must be towards the top, before all your custom grammars.
# Restrict the building of grammars to this custom one. (Prevents all grammars being build locally)
use-grammars = { only = ["ros-interface"] }

[[language]]
name = "ros-interface"
language-id = "ros-interface"
scope = "source.ros_interface"
injection-regex = "(:?rosmsg|ros_interface)"
file-types = ["msg", "srv", "action"]
comment-tokens = ["#"]

[[grammar]]
name = "ros-interface"
source = { git = "https://github.com/SuperJappie08/tree-sitter-ros-interface", rev = "BRANCH_OR_TAG_OR_COMMIT" }
```

Now you can run the following commands to build the grammar:
```shell
hx --grammar fetch
hx --grammar build
```

To update the grammar in the future remove the `runtime/grammar` folder in order to reclone and rebuild this grammar.

## 2. Setup Queries
The following files need to be copied or symlinked to your Helix `runtime/queries/ros-interface` folder

#### Symlink Method (Recommended) <!-- omit in toc -->
Run the following commands from your user Helix runtime directory.
```shell
mkdir -p queries/ros-interface/
cd queries/ros-interface
ln -s ../../grammars/sources/ros-interface/queries/highlights.scm
ln -s ../../grammars/sources/ros-interface/queries/tags.scm
ln -s ../../grammars/sources/ros-interface/queries/injections.scm
ln -s ../../grammars/sources/ros-interface/helix/textobjects.scm
```

#### Copy Method <!-- omit in toc -->
Run the following commands from your user Helix runtime directory.
```shell
mkdir -p queries/ros-interface/
cd queries/ros-interface
cp ../../grammars/sources/ros-interface/queries/highlights.scm .
cp ../../grammars/sources/ros-interface/queries/tags.scm .
cp ../../grammars/sources/ros-interface/queries/injections.scm .
cp ../../grammars/sources/ros-interface/helix/textobjects.scm .
```

### 2.1 Patch Highlighting
The [`highlights.scm` file](../queries/highlights.scm) must be modified slightly to adhere to the Helix theming convention:

```patch
diff --git a/queries/highlights.scm b/queries/highlights.scm
index d42c10d..042305c 100644
--- a/queries/highlights.scm
+++ b/queries/highlights.scm
@@ -22,12 +22,10 @@
   (array_string)
 ] @string

-(bool) @constant.builtin
+(bool) @constant.builtin.bool

-[
-  (float)
-  (integer)
-] @number
+(float) @constant.numeric.float
+(integer) @constant.numeric.integer

 ; Other
 ; Service/Action delimiter
```

> [!NOTE]
> The following instruction assumes the symlink approach was used.
> If the copy approach is used do the following **before** copying or change the path/target of `sed`.

This can be done conveniently with the following commands (from the root of the repository or from the helix runtime `grammar/source/ros-interface` folder):
```bash
sed -i 's/(bool) @constant\.builtin/(bool) @constant\.builtin.bool/' queries/highlights.scm
sed -i -z 's/\[\n\s*(float)/(float) @constant.numeric.float/' queries/highlights.scm
sed -i -z 's/\n\s*(integer)\n\] @number/\n(integer) @constant.numeric.integer/' queries/highlights.scm
```
