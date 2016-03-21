function onReadFileDirective($parse) {
  'ngInject';

  const linkFn = (scope, el, attrs) => {
    var onRead = $parse(attrs.onReadFile);

    const onChange = (e) => {
      let reader = new FileReader();

      reader.onload = function(onLoadEvent) {
        scope.$apply(function() {
          onRead(scope, { $fileContent: onLoadEvent.target.result });
        });
      };

      reader.readAsText((e.srcElement || e.target).files[0]);
    };

    el.on('change', onChange);
  };

  return {
    restrict: 'A',
    scope: false,
    link: linkFn
  };
}

export default onReadFileDirective;
