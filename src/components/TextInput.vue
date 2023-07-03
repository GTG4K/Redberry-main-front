<template>
  <div class="flex flex-col gap-2">
    <label class="text-white sm:text-sm text-xs">{{ props.name }}</label>
    <Field :name="props.name" :rules="props.rules" :placeholder="props.placeholder" :type="props.type ?? 'text'"
           class="bg-form-input text-sm placeholder-font-text p-2 rounded w-full placeholder-form-text"/>
    <ErrorMessage class="text-red-500 text-sm" :name="props.name"/>
  </div>
</template>

<script setup>
import {Field, ErrorMessage} from "vee-validate";

const props = defineProps({name: String, rules: String, placeholder: String, type: String});

</script>
