<template>
  <div class="mobileShow">
    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 text-center">
            <h1>Oops! Try viewing on a larger screen.</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobile'
}
</script>

<style>

.jumbotron {
  background-color: black;
  color: white;
}

.mobileShow {
  display: none;
}

@media only screen
and (min-device-width : 320px)
and (max-device-width : 480px){
  .mobileShow {
    display: inline;
  }
}

</style>
