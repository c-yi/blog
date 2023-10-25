# stream

## stream 流 ,代码更优雅
```java
import java.util.ArrayList;
import java.util.List;

public class demo05 {
    public static void main(String[] args) {
        show();
    }

    private static void show() {
        List<String> name = new ArrayList<>();
        name.add("张无忌");
        name.add("张三丰");
        name.add("张翠山");
        name.add("周芷若");
        name.stream()
        .filter(n -> n.startsWith("张"))
        .filter(n -> n.length() > 2)
        .forEach(n -> System.out.println(n));

    }
}
```
## 获取流对象
```java

import java.util.*;
import java.util.stream.Stream;

public class demo07 {
    public static void main(String[] args) {
        // 把集合转换为 Steam 流对象
        List<String> list = new ArrayList<>();
        Stream<String> stream1 = list.stream();
        //======================================
        Set<String> sets = new HashSet<>();
        Stream<String> stream2 = sets.stream();
        //======================================
        // map对象转换成流对象
        // 1. 获取键 存到set集合中
        Map<String, String> map = new HashMap<>();
        Set<String> keySet = map.keySet();
        Stream<String> stream3 = keySet.stream();
        //2. 获取值存到Collection集合中
        Collection<String> value = map.values();
        Stream<String> stream4 = value.stream();
        //3. 获取键值对(键值对映射关系 entrySet)
        Set<Map.Entry<String, String>> entries = map.entrySet();
        Stream<Map.Entry<String, String>> stream5 = entries.stream();
        //=======================================
        // 把数组转化为 Stream 流
        Stream<Integer> stream6 = Stream.of(1, 2, 3, 6);
        Integer[] integers = {1, 2, 3, 6};
        Stream<Integer> stream7 = Stream.of(integers);
        String[] strings = {"A", "S", "D", "D"};
        Stream<String> stream8 = Stream.of(strings);

    }
}

```
## Stream 流中的方法
> 流只能被使用一次,使用过之后就不能被再次使用!

filter 过滤
map 映射
count 统计
forEach 循环
limit 截取 Stream 流
skip 截取 Stream 流
concat 拼接
