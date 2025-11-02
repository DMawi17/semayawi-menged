# MDX Component Usage Examples

## Quote Component

The `Quote` component displays quoted text with optional author attribution.

### Basic Usage

```mdx
<Quote author="ኢያሱ 2:10-11">
ምክንያቱም የእናንተ አምላክ ጌታ በላይ በሰማይና በታች በምድር አምላክ ነው።
</Quote>
```

### Without Author

```mdx
<Quote>
This is a quote without an author attribution.
</Quote>
```

## Highlight Component

The `Highlight` component draws attention to important text with different styles.

### Available Types

1. **info** (default) - For informational highlights
2. **warning** - For warnings or cautions
3. **success** - For positive or successful outcomes
4. **emphasis** - For special emphasis

### Usage Examples

```mdx
<Highlight type="warning">
ይህንን ማስታወሻ በጥንቃቄ ያንብቡ።
</Highlight>

<Highlight type="info">
ተጨማሪ መረጃ ለማግኘት ይህንን ክፍል ይመልከቱ።
</Highlight>

<Highlight type="success">
እንኳን ደስ አለዎት! ተግባሩን በትክክል አጠናቀዋል።
</Highlight>

<Highlight type="emphasis">
ይህ በጣም አስፈላጊ ነጥብ ነው።
</Highlight>
```

### Default (no type specified)

```mdx
<Highlight>
This will use the "info" type by default.
</Highlight>
```

## Callout Component (Already Existing)

The `Callout` component creates attention-grabbing boxes for important information.

### Available Types

1. **info** - መረጃ
2. **warning** - ማስጠንቀቂያ
3. **error** - ስህተት
4. **success** - ስኬት
5. **tip** - ምክር

### Usage Example

```mdx
<Callout type="warning" title="አስፈላጊ ማስታወሻ">
ይህንን ከማድረግዎ በፊት እባክዎን ሰነዶቹን ያንብቡ።
</Callout>
```

## Combining Components

You can combine these components in your blog posts:

```mdx
# የኢያሱ ታሪክ

<Quote author="ኢያሱ 1:9">
ጠንካራና ታታሪ ሁን። አትፍራ አታስደንግጥ። ምክንያቱም የአምላክ ጌታ ሁሉንም ጊዜ ከእርስዎ ጋር ነው።
</Quote>

<Highlight type="emphasis">
ኢያሱ በእምነት የተመረጠ መሪ ነበር።
</Highlight>

<Callout type="tip" title="የጥናት ምክር">
የኢያሱን መሪነት ባህሪያት ከዘመናችን መሪነት ጋር ያነፃፅሩ።
</Callout>
```
