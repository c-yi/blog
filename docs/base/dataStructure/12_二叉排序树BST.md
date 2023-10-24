# 二叉排序树BST
```javascript
class Node {
    constructor(v) {
        this.val = v;
        this.left = null;
        this.right = null
    }
}

class BinarySortTree {
    constructor() {
        this.root = null
    }

    _infixOrder(node) {
        if (node.left !== null) {
            this._infixOrder(node.left)
        }
        console.log(node.val + ' ');
        if (node.right !== null) {
            this._infixOrder(node.right)
        }
    }

    infixOrder() {
        if (this.root !== null) {
            this._infixOrder(this.root)
        } else {
            console.log('二叉排序树为空,不能遍历');
        }
    }

    _add(v, node) {
        if (v > node.val) {
            if (node.right) {
                this._add(v, node.right)
            } else {
                node.right = new Node(v)
            }
        }
        if (v < node.val) {
            if (node.left) {
                this._add(v, node.left)
            } else {
                node.left = new Node(v)
            }
        }
    }

    add(v) {
        if (!this.root) {
            this.root = new Node(v)
        } else {
            this._add(v, this.root)
        }
    }

    // 找到该节点的父节点
    // 找到最小值
    _findMin(node) {
        if (node.left === null) return node;
        return this._findMin(node.left)
    }

    // 删除最小值,并返回新的值
    _deleteMin(node) {
        // 一直递归左子树
        // 如果左子树为空，就判断节点是否拥有右子树
        // 有右子树的话就把需要删除的节点替换为右子树
        if ((node != null) && !node.left) return node.right;
        node.left = this._deleteMin(node.left);
        return node
    }

    _delete(v, node) {
        // 找到该节点
        if (node.val !== v) {
            if (node.val > v) {
                node.left = this._delete(v, node.left)
                return node;
            }
            if (node.val < v) {
                node.right = this._delete(v, node.right);
                return node;
            }
        } else {
            //1. 没有左右节点
            if (!node.left && !node.right) {
                return null
            }
            //2. 只有左节点
            if (node.left && !node.right) {
                return node.left
            }
            //3. 只有右节点
            if (!node.left && node.right) {
                return node.right
            }
            //4. 有2个节点
            // 找到右节点的最小节点,代替要删除的节点
            let min = this._findMin(node.right);
            // 删除右节点的最小值
            min.right = this._deleteMin(node.right);
            // 将被删除节点的左右节点,拼接到新节点上
            min.left = node.left;
            return min
        }
    }

    delete(v) {
        this.root = this._delete(v, this.root)
    }

    // 删除节点
    // 1. 叶节点,直接删除
    // 2. 只有一个子树,找到该子树的最小节点,然后替换需要被删除的节点
    // 3. 有2个子树 找到该节点,右子树的最小值代替该节点,然后把删除的节点的左子树,右子树(删除最小值之后)赋值给新的节点
}

const BinaryTree = new BinarySortTree();

let n = [110, 17, 114, 5, 4, 3, 2, 19, 112, 117, 1, 6, 20];
for (let i = 0; i < n.length; i++) {
    BinaryTree.add(n[i])
}
BinaryTree.delete(5);
BinaryTree.infixOrder();
console.log(JSON.stringify(BinaryTree.root));

```

## 个人感觉 有些地方很精髓 就不拆分代码了 
