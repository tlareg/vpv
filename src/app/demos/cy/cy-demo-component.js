import $ from 'jquery';
import cytoscape from 'cytoscape';
import cyDemoTemplate from './cy-demo.html';
import './cy-demo.css';

class CyDemoCtrl {
  constructor($timeout) {
    'ngInject';

    $timeout(() => {
      this.createFirstGraph();
      this.createSecondGraph();
    })
  }

  createFirstGraph() {
    const container = $('.cy-1');
    const cy = cytoscape({

      container: container,

      elements: [
        { // node n1
          group: 'nodes', // 'nodes' for a node, 'edges' for an edge
          // NB the group field can be automatically inferred for you but specifying it
          // gives you nice debug messages if you mis-init elements

          // NB: id fields must be strings or numbers
          data: { // element data (put dev data here)
            id: 'n1', // mandatory for each element, assigned automatically on undefined
            parent: 'nparent', // indicates the compound node parent id; not defined => no parent
          },

          // scratchpad data (usually temp or nonserialisable data)
          scratch: {
            foo: 'bar'
          },

          position: { // the model position of the node (optional on init, mandatory after)
            x: 100,
            y: 100
          },

          selected: false, // whether the element is selected (default false)
          selectable: true, // whether the selection state is mutable (default true)
          locked: false, // when locked a node's position is immutable (default false)
          grabbable: true, // whether the node can be grabbed and moved by the user
          classes: 'foo bar' // a space separated list of class names that the element has
        },

        { // node n2
          data: { id: 'n2' },
          renderedPosition: { x: 200, y: 200 } // can alternatively specify position in rendered on-screen pixels
        },

        { // node n3
          data: { id: 'n3', parent: 'nparent' },
          position: { x: 123, y: 234 }
        },

        { // node nparent
          data: { id: 'nparent', position: { x: 200, y: 100 } }
        },

        { // edge e1
          data: {
            id: 'e1',
            // inferred as an edge because `source` and `target` are specified:
            source: 'n1', // the source node id (edge comes from this node)
            target: 'n2'  // the target node id (edge goes to this node)
          }
        }
      ],

      layout: {
        name: 'preset'
      },

      // so we can see the ids etc
      style: [
        {
          selector: 'node',
          style: {
            'content': 'data(id)'
          }
        },

        {
          selector: ':parent',
          style: {
            'background-opacity': 0.6
          }
        }
      ]

    });
    window.cy1 = cy;
  }

  createSecondGraph() {
    const container = $('.cy-2')
    const cy = cytoscape({
      container: container,
      style: [
        {
          selector: 'node',
          style: {
            'content': 'data(id)',
            'background-color': '#f00'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#00f',
            'target-arrow-color': '#00f',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
      // layout: {
      //   name: 'grid',
      //   rows: 4
      // },
      elements: [
        {
          data: {
            id: 'n1',
            name: 'name n1'
          }
        },
        {
          data: {
            id: 'n2',
            name: 'name n2'
          }
        },
        {
          data: {
            id: 'n3',
            name: 'name n3'
          }
        },
        {
          data: {
            id: 'n4',
            name: 'name n4'
          }
        },
        {
          data: {
            id: 'e1',
            source: 'n1',
            target: 'n2'
          }
        },
        {
          data: {
            id: 'e2',
            source: 'n2',
            target: 'n3'
          }
        },
        {
          data: {
            id: 'e3',
            source: 'n2',
            target: 'n4'
          }
        }
      ]
    });
    window.cy2 = cy;

    cy.add({
        data: { id: 'n5' }
    });

    cy.add({
      data: { id: 'e4', source: 'n3', target: 'n5' }
    });

    cy.remove(cy.$('#n1'));
  }
}

export default {
  template: cyDemoTemplate,
  controller: CyDemoCtrl,
  controllerAs: 'cyDemoCtrl'
};
