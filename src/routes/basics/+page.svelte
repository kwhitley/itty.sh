<script>
  import { LOGGING } from '~/constants'
  import Page from '~/layout/Page.svelte'

  LOGGING && console.log('loading app...')
</script>

<!-- MARKUP -->
<Page>
  <h1>Hello with a <span class="text-gradient from-purple to-pink">really long</span> title that runs on <span class="colored cyan">and on</span></h1>

  <p>Lorem ipsum dolor <a href="/">sit amet</a>, consectetur adipiscing elit. Donec neque arcu, convallis vel sollicitudin quis, egestas vel magna. Morbi ac nisi eu est ullamcorper fermentum. Etiam et mollis orci. Quisque varius, dolor nec vestibulum viverra, metus sapien ultrices felis, sed pharetra mauris felis sit amet arcu. Phasellus ornare nunc in lacus euismod, vel porttitor massa aliquet. Proin vitae lorem at ex commodo euismod non quis velit. Duis enim ante, scelerisque vitae porttitor at, mattis id justo. Phasellus vel urna justo. Donec accumsan aliquam lectus, quis scelerisque risus scelerisque ut. Nulla mi elit, tempor eu ex laoreet, tristique pretium dolor. Cras tempus sagittis efficitur.</p>

  <blockquote>
    Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus. Vestibulum semper, dolor a posuere venenatis, nunc augue volutpat ante, eu fringilla nunc libero a nibh.

    <cite>
      a wise person
    </cite>
  </blockquote>

  <p>Praesent pharetra arcu id tortor lacinia, in molestie sem tempor. Etiam imperdiet enim velit, ut vestibulum dolor posuere vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus porttitor venenatis ligula tristique placerat. Morbi semper, purus at porta vulputate, diam ligula imperdiet nulla, ac pellentesque dui lectus interdum leo. Nulla ornare quam nisl, et tristique augue venenatis eu. Nam eget eros nisl. Morbi eu nunc nunc. Praesent in mollis elit. Etiam ut efficitur eros, in porta lorem. Maecenas iaculis quam sit amet justo blandit, nec convallis dui pharetra. Nunc euismod ante sit amet mauris pellentesque, et aliquam lorem euismod. Nunc vel placerat felis. Vivamus laoreet ornare velit, rhoncus fermentum tellus suscipit nec.</p>

  <h2>Heading 2</h2>

  <p>Nam sit amet vulputate est. Nunc gravida semper neque a imperdiet. Vivamus eleifend metus felis, quis euismod lacus suscipit vitae. Mauris sed dolor a diam vulputate tincidunt. Mauris eu leo iaculis ipsum bibendum consequat. Fusce a aliquet nisi. Nulla nec ligula pharetra, lacinia erat pellentesque, egestas ipsum. Curabitur lectus turpis, malesuada eget volutpat non, consectetur at tortor. Proin maximus nisl et ligula malesuada, et pretium purus finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam non consectetur elit.</p>

  <ul>
    <li>Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus.</li>
    <li>
      Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus. Vestibulum semper, dolor a posuere venenatis, nunc augue volutpat ante, eu fringilla nunc libero a nibh. Curabitur sed euismod lorem, eget convallis odio. Nulla tincidunt fringilla ligula sed elementum. Proin ex odio, tempus vitae auctor vitae, sagittis ac dolor. Nullam luctus lorem sed dui iaculis, id elementum ipsum pulvinar. Etiam id lobortis libero. Praesent tempor pulvinar arcu eget tempor. Proin scelerisque feugiat orci, faucibus laoreet neque. Maecenas auctor ipsum eget auctor porta. Suspendisse venenatis metus commodo enim vestibulum interdum.
    </li>
    <li>Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus.</li>
  </ul>

  <h3>Heading 3</h3>
  <p>Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus. Vestibulum semper, dolor a posuere venenatis, nunc augue volutpat ante, eu fringilla nunc libero a nibh. Curabitur sed euismod lorem, eget convallis odio. Nulla tincidunt fringilla ligula sed elementum. Proin ex odio, tempus vitae auctor vitae, sagittis ac dolor. Nullam luctus lorem sed dui iaculis, id elementum ipsum pulvinar. Etiam id lobortis libero. Praesent tempor pulvinar arcu eget tempor. Proin scelerisque feugiat orci, faucibus laoreet neque. Maecenas auctor ipsum eget auctor porta. Suspendisse venenatis metus commodo enim vestibulum interdum.</p>

  <p>Nulla nisl diam, egestas vitae sollicitudin ac, sodales quis velit. Ut quis dui ut libero molestie sodales quis vitae nisi. Phasellus ac fermentum odio, a congue turpis. Donec scelerisque et massa eu iaculis. Praesent ac est non diam consectetur iaculis. In sodales dui ut dictum molestie. Praesent non aliquet enim. Nullam eget faucibus tellus. Suspendisse potenti. Aenean nisi ipsum, rhoncus ut nunc quis, bibendum hendrerit metus. Vestibulum ac lacus a eros imperdiet sagittis. Nunc accumsan condimentum leo at posuere. Suspendisse ultricies volutpat mauris gravida maximus. Donec nunc ligula, maximus in quam id, egestas egestas nulla. Pellentesque sed tristique nisi. Praesent quis placerat mi, ut viverra dolor.</p>

  <figure class="horizontal">
    <img alt="a kitten" src="https://api.slick.af/images/HWaCwcXh.jpg" width="1000" height="400" />
    <caption><a href="https://slick.af/kevin/details/HWaCwcXh">Atlas</a>, by <a href="https://twitter.com/kevinrwhitley">Kevin R. Whitley</a>
      A cute little kitten. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque arcu, convallis vel sollicitudin quis, egestas vel magna.</caption>
  </figure>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque arcu, convallis vel sollicitudin quis, egestas vel magna. Morbi ac nisi eu est ullamcorper fermentum. Etiam et mollis orci. Quisque varius, dolor nec vestibulum viverra, metus sapien ultrices felis, sed pharetra mauris felis sit amet arcu. Phasellus ornare nunc in lacus euismod, vel porttitor massa aliquet. Proin vitae lorem at ex commodo euismod non quis velit. Duis enim ante, scelerisque vitae porttitor at, mattis id justo. Phasellus vel urna justo. Donec accumsan aliquam lectus, quis scelerisque risus scelerisque ut. Nulla mi elit, tempor eu ex laoreet, tristique pretium dolor. Cras tempus sagittis efficitur.</p>

  <ol>
    <li>Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus.</li>
    <li>
      Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus. Vestibulum semper, dolor a posuere venenatis, nunc augue volutpat ante, eu fringilla nunc libero a nibh. Curabitur sed euismod lorem, eget convallis odio. Nulla tincidunt fringilla ligula sed elementum. Proin ex odio, tempus vitae auctor vitae, sagittis ac dolor. Nullam luctus lorem sed dui iaculis, id elementum ipsum pulvinar. Etiam id lobortis libero. Praesent tempor pulvinar arcu eget tempor. Proin scelerisque feugiat orci, faucibus laoreet neque. Maecenas auctor ipsum eget auctor porta. Suspendisse venenatis metus commodo enim vestibulum interdum.
    </li>
    <li>Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus.</li>
  </ol>

  <p>Praesent pharetra arcu id tortor lacinia, in molestie sem tempor. Etiam imperdiet enim velit, ut vestibulum dolor posuere vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus porttitor venenatis ligula tristique placerat. Morbi semper, purus at porta vulputate, diam ligula imperdiet nulla, ac pellentesque dui lectus interdum leo. Nulla ornare quam nisl, et tristique augue venenatis eu. Nam eget eros nisl. Morbi eu nunc nunc. Praesent in mollis elit. Etiam ut efficitur eros, in porta lorem. Maecenas iaculis quam sit amet justo blandit, nec convallis dui pharetra. Nunc euismod ante sit amet mauris pellentesque, et aliquam lorem euismod. Nunc vel placerat felis. Vivamus laoreet ornare velit, rhoncus fermentum tellus suscipit nec.</p>

  <h1>Hello With Some Title Case Words</h1>
  <p>Nam sit amet vulputate est. Nunc gravida semper neque a imperdiet. Vivamus eleifend metus felis, quis euismod lacus suscipit vitae. Mauris sed dolor a diam vulputate tincidunt. Mauris eu leo iaculis ipsum bibendum consequat. Fusce a aliquet nisi. Nulla nec ligula pharetra, lacinia erat pellentesque, egestas ipsum. Curabitur lectus turpis, malesuada eget volutpat non, consectetur at tortor. Proin maximus nisl et ligula malesuada, et pretium purus finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam non consectetur elit.</p>

  <figure>
    <img alt="a kitten" src="https://api.slick.af/images/zVrPJAPp.jpg" width="1000" height="500" />
    <caption><a href="https://slick.af/kevin/details/zVrPJAPp">Torment</a>, by <a href="https://twitter.com/kevinrwhitley">Kevin R. Whitley</a></caption>
  </figure>

  <p>Ut tellus neque, blandit ac est in, tempor dictum lorem. Donec et pellentesque tellus. Vestibulum semper, dolor a posuere venenatis, nunc augue volutpat ante, eu fringilla nunc libero a nibh. Curabitur sed euismod lorem, eget convallis odio. Nulla tincidunt fringilla ligula sed elementum. Proin ex odio, tempus vitae auctor vitae, sagittis ac dolor. Nullam luctus lorem sed dui iaculis, id elementum ipsum pulvinar. Etiam id lobortis libero. Praesent tempor pulvinar arcu eget tempor. Proin scelerisque feugiat orci, faucibus laoreet neque. Maecenas auctor ipsum eget auctor porta. Suspendisse venenatis metus commodo enim vestibulum interdum.</p>

  <hr />

  <p>Nulla nisl diam, egestas vitae sollicitudin ac, sodales quis velit. Ut quis dui ut libero molestie sodales quis vitae nisi. Phasellus ac fermentum odio, a congue turpis. Donec scelerisque et massa eu iaculis. Praesent ac est non diam consectetur iaculis. In sodales dui ut dictum molestie. Praesent non aliquet enim. Nullam eget faucibus tellus. Suspendisse potenti. Aenean nisi ipsum, rhoncus ut nunc quis, bibendum hendrerit metus. Vestibulum ac lacus a eros imperdiet sagittis. Nunc accumsan condimentum leo at posuere. Suspendisse ultricies volutpat mauris gravida maximus. Donec nunc ligula, maximus in quam id, egestas egestas nulla. Pellentesque sed tristique nisi. Praesent quis placerat mi, ut viverra dolor.</p>
</Page>

<!-- STYLES -->
<style lang="scss">

</style>
