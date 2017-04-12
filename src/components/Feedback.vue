<template>
  <div class="modal fade" id="formFeedback" tabindex="-1" role="dialog" aria-labelledby="formFeedback">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-xs-12">
              <form action="https://formspree.io/diogenis.panagiotis@gmail.com"
                    method="POST">
                  <input class="text-email first-inp" type="text" placeholder="Name" name="name" required>
                  <input class="text-email" type="email" placeholder="Email" name="_replyto" required>
                  <input class="text-email" type="text" placeholder="Feedback" name="feedback" required>
                  <button @click="renderFormSpree()" class="btn btn-md feedback" type="submit" value="Send">
                    <span class="glyphicon glyphicon-send" area-hidden="true"></span>
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'feedback'
}
</script>

<style scoped>
.modal-content {
  border: 5px solid #4AA0DD;
  overflow: hidden;
  -webkit-border-radius: 5px !important;
  -moz-border-radius: 5px !important;
  border-radius: 5px !important;
}

.modal-header {
  background-color: black;
  border-bottom: 5px solid #4AA0DD;
}

.modal-body {
  padding: 5px 5px 0px 5px;
  background-color: black;
  margin-bottom: 0px;
}

.close {
  color: #fff;
  opacity: 1;
  text-shadow: none;
}
.close:hover {
  color: #4AA0DD;
  text-shadow: none;
}

.modal-dialog {
  padding-top: 15%;
}

.header-success {
  color: #4AA0DD;
  font-size: 15px;
}
.text-email {
  color: #fff;
  font-size: 14px;
  border-bottom: 1px solid white;
}
.first-inp {
  margin-top: 0px;
}
.send {
  color: #fff;
}

.feedback {
  background-color: black;
  border: #4AA0DD 1px solid;
  vertical-align: middle;
  width: 260px;
  margin-top: 15px;
}

.feedback:hover {
  background-color: #4AA0DD;
}

.btn-md:hover .glyphicon-send {
  color: black;
}
.glyphicon-send {
  background-color: transparent;
  color: #4AA0DD;
  margin-top: 3px;
}

::-webkit-input-placeholder {
  color: #fff;
  font-size: 14px;
}
.col-xs-12 {
  /*margin-top: 15px;*/
  margin-bottom: 5px;
}
form {
  padding: 10px;
}
input {
  margin-top: 10px;
  width: 260px;
}
input:-webkit-autofill {
  background-color: black;
}
.btn:focus {
  outline: none;
}
</style>
