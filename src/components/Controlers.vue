<template>
  <div class="controlers">
    <v-textarea
      class="field"
      filled
      name="textarea"
      label="Type your message"
      rows="2"
      :value="value"
      :disabled="disabledField"
      @keyup.enter="$emit('message')"
      @input="$emit('input', $event)"
    />
    <v-btn
      @click="$emit('message')"
      x-large
      color="primary"
      :disabled="disabledButton"
    >
      {{ buttonText }}
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'Controlers',
  props: {
    buttonText: { type: String, required: true },
    disabledField: { type: Boolean, default: true },
    disabledButton: { type: Boolean, default: false },
    value: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
  .controlers  {
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    .v-text-field__details {
      display: none!important;
    }
    .field {
      width: 80%;
      max-width: 80%;
    }
  }
  @media(max-width: 650px) {
    .controlers {
      justify-content: center;
      flex-direction: column;
      .field {
        max-width: 90%;
        width: 90%;
      }
    }
    
  }
</style>
