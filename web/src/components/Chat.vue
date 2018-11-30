<template>
  <div class="container">
    <h1>On call with: {{ activeCall }}</h1>
    <b-button @click="disconnect" variant="danger">End Call</b-button>
    <div id="publisher"></div>
    <div id="subscriber"></div>
  </div>
</template>

<script>
import * as OT from '@opentok/client'
import { mapGetters, mapState } from 'vuex';

// const apiKey = '46228432';
// const sessionId = '2_MX40NjIyODQzMn5-MTU0MzQ5ODQ3NjUwMX5pamNMcVhUTnlIWSsrY2VUSFJUMWduZDB-fg';
// const token = 'T1==cGFydG5lcl9pZD00NjIyODQzMiZzaWc9MTJmMmUwOTRhM2ZhOTYwNDYwMTYzNTg3YmEwNGJhNzM3MTAxYmZlZTpzZXNzaW9uX2lkPTJfTVg0ME5qSXlPRFF6TW41LU1UVTBNelE1T0RRM05qVXdNWDVwYW1OTWNWaFVUbmxJV1NzclkyVlVTRkpVTVdkdVpEQi1mZyZjcmVhdGVfdGltZT0xNTQzNTIxNTgyJm5vbmNlPTAuNzg0MTE2MjM4NjU3NDAxMiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQ2MTEzNTgyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
const apiKey = '46228482';
const sessionId = '2_MX40NjIyODQ4Mn5-MTU0MzQ5OTIyNDYyNH5Yd0paenpZQm1NclM4MlF4V0N1ajNIV2Z-fg';
const token = 'T1==cGFydG5lcl9pZD00NjIyODQ4MiZzaWc9NDIyNDJkZTZkNjdjMGY1ODg1ZjcwOTAwYzk0Y2E4M2YzMjZiZTM0MjpzZXNzaW9uX2lkPTJfTVg0ME5qSXlPRFE0TW41LU1UVTBNelE1T1RJeU5EWXlOSDVZZDBwYWVucFpRbTFOY2xNNE1sRjRWME4xYWpOSVYyWi1mZyZjcmVhdGVfdGltZT0xNTQzNDk5MjU5Jm5vbmNlPTAuOTQ0MjU0MjkxODA3MDk5MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQ0MTA0MDU4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

function handleError(error) {
  if (error) {
    console.log(error.message);
  }
}

const session = OT.initSession(apiKey, sessionId);

session.on('streamDestroyed', (event) => {
  if (event.reason === 'networkDisconnected') {
    event.preventDefault();
    let subscribers = session.getSubscribersForStream(event.stream);
    if (subscribers.length > 0) {
      let subscriber = document.getElementById(subscribers[0].id);
      // Display error message inside the Subscriber
      subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
        + 'or because the other party lost their connection.';
      // subscriber.remove();
      event.preventDefault();   // Prevent the Subscriber from being removed
    }
  }
})

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isLoggedIn) {
        next({ name: 'Login' })
      }
    })
  },

  data() {
    return {
      session: {}
    }
  },

  mounted() {
    console.log('monting Chat');

    const publisher = OT.initPublisher(this.$el.children.publisher, {
      insertMode: 'replace',
      publishAudio: true,
      publishVideo: false
    }, handleError)

    // Connect to the session
    session.connect(token, (error) => {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error)
        console.log('error');
      } else {
        session.publish(publisher, handleError);
      }
    });

    session.on('streamCreated', (event) => {
      console.log('test')
      session.subscribe(event.stream, this.$el.children.subscriber, {
        insertMode: 'replace'
      }, handleError)
    })
  },

  beforeDestroy() {
    if (session) {
      session.disconnect();
      session.off();
    }
  },

  computed: {
    ...mapGetters(['onCallWith', 'isLoggedIn']),
    ...mapState(['activeCall'])
  },

  methods: {
    disconnect() {
      session.disconnect();
      session.off();
      // console.log('disconnect');
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>

