export namespace LinkedListPackage {
    interface nodeType {
        next: nodeType;
        data: any;
        prev: nodeType;
    }

    class Node implements nodeType {
        data: any;
        next: nodeType;
        prev: nodeType;

        constructor(data: any) {
            this.next = null;
            this.data = data;
            this.prev = null;
        }
    }

    export class LinkedList {
        size: number;
        head: nodeType;
        end: object;

        constructor() {
            this.size = 0;
            this.head = new Node(null);
            this.end = null;
        }

        isEmpty(): boolean {
            return this.size === 0
        }

        /**
         * 按照索引中找节点
         * @param header 头结点
         * @param index 索引
         * @param currentIndex 当前索引
         */
        find(header, index, currentIndex: number): nodeType {
            // 因为节点不是一个连续存储在内存中的
            if (index === currentIndex) return header;
            return this.find(header.next, index, currentIndex + 1)
        }

        addNode(data, index) {
            let newNode = new Node(data);
            let prev = this.find(this.head, index, 0);
            newNode.next = prev.next;
            newNode.prev = prev;
            prev.next = newNode;
            this.size++;
            return prev.next;
        }

        insertNode(data: any, index: number) {
            this.addNode(data, index)
        }

        addToFirst(data: any) {
            this.addNode(data, 0)
        }

        addToLast(data: any) {
            this.addNode(data, this.size)
        }

        removeNode(index: number): nodeType {
            let current = this.find(this.head, index, 0);

            if (current.next) { //判断是不是最后还一个
                // 上一个节点 => 下一个节点
                current.prev.next = current.next;
                // 下一个节点 => 上一个节点
                current.next.prev = current.prev;
            } else {
                current.prev.next = null
            }
            // 清空节点
            //node.next = null;
            this.size--;
            return current

        }

        removeFirst(): nodeType {
            return this.removeNode(0)
        }

        removeLast(): nodeType {
            return this.removeNode(this.size)
        }


        showList(): void {
            let temp: nodeType | null = this.head;
            while (temp) {
                console.log(temp.data)
                temp = temp.next
            }

        }
    }

    let l1 = new LinkedList();
    l1.addToLast("第1个元素");
    l1.addToLast("第2个元素");
    l1.addToLast("第3个元素");
    l1.addToLast("第4个元素");
    l1.showList();
    l1.removeNode(2);
    l1.showList()
}
