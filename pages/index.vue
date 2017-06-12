<template>
  <div class="column is-11">
    <section class="section" style="padding-top:0px;padding-bottom:12px;">
      <div class="container">
        <h1 class="title" style="margin-bottom:12px;">Consultar</h1>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-3">

        <div class="field">
          <p class="control has-icons-left">
            <input class="input is-hovered" type="text" placeholder="Cedula">
            <span class="icon is-small is-left">
              <i class="fa fa-vcard"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <span class="select">
              <select>
                <option selected>-- Seleccione la Nomina --</option>
              </select>
            </span>
            <span class="icon is-small is-left">
              <i class="fa fa-globe"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control">
            <button class="button is-outlined is-dark">
              Buscar
            </button>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {}
  }
</script>

<style></style>
