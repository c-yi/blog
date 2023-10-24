# 平衡二叉树
左右子树高度差>1 需要进行旋转,来保持平衡
## 左旋转
怎么处理-进行左旋转
1. 创建一个新的节点 newNode(以4这个值创建)
创建一个新的节点,值等于当前根节点的值
2. 把新节点的左子树设置了当前节点的左子树`newNode.left=left`
3. 把新节点的右子树设置为当前节点的右子树的左子树`newNode.right = nowNode.right.left`
4. 把当前节点的值换为右子节点的值`nowNode.value=right.value`
5. 把当前节点的右子树设置成右子树的右子树`nowNode.right=right.right`
6. 把当前节点的左子树设置为新节点`nowNode.left=newLeft`

## AVL

1) 平衡二叉树也叫平衡二叉搜索树( Self-balancing binary search tree)又被称为AVL树,可以保证查询效率较高  
2) 具有以下特点:它是一棵空树或它的左右两个子树的高度差的绝对值不超过1,并且左右两个子树都是一棵平衡二叉树。
平衡二叉树的常用实现方法有红黑树、AVL、替罪羊树、 Treap、伸展树等  
3) 举例说明,看看下面哪些AVL树,为什么?  

```javascript
class Node {
    constructor(v) {
        this.val = v;
        this.left = null;
        this.right = null
    }
}

class AVLTree {
    constructor() {
        this.root = null
    }
    // 中序遍历
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
}

const BinaryTree = new AVLTree();

//let n = [4, 3, 6, 5, 7, 8]; //测试左旋
//let n = [10, 12, 8, 9, 7, 6]; //测试右旋
let n = [10, 11, 7, 6, 8, 9];// 测双旋
for (let i = 0; i < n.length; i++) {
    BinaryTree.add(n[i])
}
BinaryTree.infixOrder();

let l = BinaryTree.getLeftH(BinaryTree.root);
let r = BinaryTree.getRightH(BinaryTree.root);
console.log('根节点', BinaryTree.root);
console.log('根节点', JSON.stringify(BinaryTree.root));

console.log(`左树高度 ${l} 右树高度${r} 高度差${l - r}`);

```
## 获取树的高度
```javascript
  getLeftH(node) {
        if (node.left !== null) {
            return this.height(node.left)
        } else {
            return 0
        }
    }

  getRightH(node) {
        if (node.right !== null) {
            return this.height(node.right)
        } else {
            return 0
        }
    }
  // #重点
  height(node) {
        let left = node.left === null ? 0 : this.height(node.left);
        let right = node.right === null ? 0 : this.height(node.right);
        return Math.max(left, right) + 1
    }

```


## 旋转
```javascript
// 左旋转
static leftRotate(node) {
    let {left, right} = node;
    // 1. 以根节点的值创建一个新节点
    let newNode = new Node(node.val);
    // 2. 新节点的左节点为根节点的左节点
    newNode.left = left;
    // 3. 新节点的右节点为根节点的右节点的左节点
    newNode.right = right.left;
    // 4. 根节点的值为替换为根节点的右节点的值
    node.val = right.val;
    // 新的根节点
    // 5. 右节点为原根节点的右节点的右节点
    node.right = right.right;
    // 6. 左节点为新创建的节点
    node.left = newNode;
} 

// 右旋转
static rightRotate(node) {
    // 逻辑和左旋转相反所以就不写注释了
    let {left, right} = node;
    let newNode = new Node(node.val);
    newNode.left = left.right;
    newNode.right = right;
    node.val = left.val;
    node.right = newNode;
    node.left = left.left;
}
```

## 添加节点,并平衡二叉树

```javascript
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
        this.root = new Node(v);
        return
    }
    //添加新元素
    this._add(v, this.root);
    // 判断是否需要旋转
    let LH = this.getLeftH(this.root); //左子树高度
    let RH = this.getRightH(this.root);//右子树树高度
    
    // #重点
    
    if (LH - RH > 1) { //左边高度大于右边高度需要右旋
        let node = this.root.left;
        let LlH = this.getLeftH(node);
        let RrH = this.getRightH(node);

        if (RrH > LlH) {
            //如果 根节点左子树 - 根节点右子树 >1 且 左子树的右节点高度大于左节点高度
            // 先进行左旋
            AVLTree.leftRotate(node)
        }
        AVLTree.rightRotate(this.root);
        return;
    }
    // #重点
    
    if (RH - LH > 1) { //左边高度大于右边高度需要右旋
        let node = this.root.right;
        let LlH = this.getLeftH(node);
        let RrH = this.getRightH(node);
        if (LlH > RrH) {
            AVLTree.rightRotate(node)
        }
        AVLTree.leftRotate(this.root)
    }

}
```
## 总结 主要是学习怎么再添加结点的时候去平衡二叉树,减少极端情况的出现
