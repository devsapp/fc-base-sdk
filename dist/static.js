"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_HELP_INFO = void 0;
exports.REMOVE_HELP_INFO = [
    {
        header: 'Remove resources',
        content: 'Specify RESOURCE to remove it and resource belonging to it.\n' +
            'If service is specified, service and its functions should be removed.\n' +
            'If function is specified, function and its triggers should be removed.\n' +
            'If trigger is specified, you can specify the trigger name to remove the specific trigger or remove all triggers without name.\n'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'name',
                description: 'Resource name to be removed, only for trigger/domain resource.',
                alias: '-n',
                type: String,
            },
            {
                name: 'help',
                description: 'Help for rm.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    // {
    //   header: 'Global Options',
    //   optionList: [
    //     {
    //       name: 'assumeYes',
    //       description: 'Assume that the answer to any question which would be asked is yes.',
    //       alias: 'y',
    //       type: Boolean,
    //     },
    //   ],
    // },
    {
        header: 'Examples',
        content: [
            '$ remove {bold remove} {underline service}',
            '$ remove {bold remove} {underline function}',
            '$ remove {bold remove} {underline trigger} [{bold --name} {underline name}]',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0YXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGdCQUFnQixHQUFHO0lBQzlCO1FBQ0UsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUsK0RBQStEO1lBQzVFLHlFQUF5RTtZQUN6RSwwRUFBMEU7WUFDMUUsaUlBQWlJO0tBQUU7SUFDakk7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsZ0VBQWdFO2dCQUM3RSxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxPQUFPO2FBQ2Q7U0FDRjtLQUNGO0lBQ0QsSUFBSTtJQUNKLDhCQUE4QjtJQUM5QixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLDJCQUEyQjtJQUMzQiw0RkFBNEY7SUFDNUYsb0JBQW9CO0lBQ3BCLHVCQUF1QjtJQUN2QixTQUFTO0lBQ1QsT0FBTztJQUNQLEtBQUs7SUFDTDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQLDRDQUE0QztZQUM1Qyw2Q0FBNkM7WUFDN0MsNkVBQTZFO1NBQzlFO0tBQ0Y7Q0FDRixDQUFDIn0=