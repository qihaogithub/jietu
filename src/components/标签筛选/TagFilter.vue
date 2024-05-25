<template>
  <div class="tag-filter">
    <span v-for="tag in tags" :key="tag" :class="{ selected: selectedTags.includes(tag) }" @click="toggleTag(tag)">
      {{ tag }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义属性
const props = defineProps({
  tags: Array,
  selectedTags: Array,
});

// 定义事件
const emit = defineEmits(['update:selectedTags']);

// 切换标签
const toggleTag = (tag) => {
  // 如果当前标签在已选标签中，则从已选标签中移除，否则添加到已选标签中
  const newSelectedTags = props.selectedTags.includes(tag)
    ? props.selectedTags.filter(t => t !== tag)
    : [...props.selectedTags, tag];
  // 更新已选标签
  emit('update:selectedTags', newSelectedTags);
};
</script>

<style scoped>
/* 样式 */
.tag-filter {
  margin-bottom: 20px;
}

.tag-filter span {
  display: inline-block;
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.tag-filter span.selected {
  background-color: #42b983;
  color: white;
}
</style>