# 常用API 
## object 类
1. toString 方法 是Object类的方法,重写之后可以输出类中的属性
2. equals 方法,比较两个对象,如果是基本数据类型比较的是值,如果是引用数据类型是两个对象的地址值

## date

一. **parse**

格式化时间 使用DateFormat类中的方法parse,把文本解析成日期
使用步骤: 

1. 创建SimpleDateFormat对象,构建方法中传递指定模式
2. 调用SimpleDateFormat对象中的方法,把符合构造方法中的模式的字符串,解析为Date日期

注意: public Date parse(String source) throws ParseException 
    parse 方法声明了一个异常叫作 parseException 解析异常;如果字符串和构造方法的模式不一样那么程序就会抛出此异常,
    调出了一个抛出异常的方法;就必须处理这个异常,要么throws 继续抛出这个异常,要么try catch 自己处理掉这个异常
    
二. **format**

 使用 SimpleDateFormat 类中的方法format 把日期格式化为文本,
 使用步骤: 

1. 创建SimpleDateFormat对象,构造方法中传递指定模式
2. 调用SimpleDateFormat对象中的方法,把符合构造方法中的模式的Date日期,解析为字符串
   注意: 使用SimpleDateFormat对象

```java
import java.text.SimpleDateFormat;
import java.util.Date;
public class Demo01Date extends SimpleDateFormat {
    public static void main(String[] args) {
        Date date = new Date(ff);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
        System.out.println(sdf.format(date));
    }
}

```

## calender

java.utils.calender类,日历类

1. calender类是一个抽象类 里面提供了很多操作日历字段的方法(YEAR ,MONTH ,DAY OF MONTH,HOUR),
2. calender类是一个抽象类 无法直接创建对象使用,里面有一个静态方法叫作getInstance().方法返回calender类子类对象
   static calender getInstance() 使用默认时区和语言环境,获得一个日历

## StringBuilder 字符串缓冲区

| String                                                       | StringBuilder                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. 字符串常量,他们的值创建之后不能更改,                      | 1. 字符串缓冲区,可以提高字符串的操作效率,(看成一个长度可以变化的字符串) |
| 2. 字符串的底层是一个被final修饰的数组不能更改是一个常量,    | 2. 底层也是一个数组,但是没有被final修饰,可以改变长度!        |
| 3. private final byte[] value;                               | 3. byte[] value = new byte[16]                               |
| 4. 进行字符串的相加,内存中就会出现有多个字符串,占用空间多,效率低小 | 4. StringBuilder始终是一个数组,占用空间少,效率高如果超过初始容量会自动扩容 |

### 