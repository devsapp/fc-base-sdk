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
                name: 'trigger-name',
                description: 'Resource name to be removed, only for trigger/domain resource.',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0YXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGdCQUFnQixHQUFHO0lBQzlCO1FBQ0UsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUsK0RBQStEO1lBQzVFLHlFQUF5RTtZQUN6RSwwRUFBMEU7WUFDMUUsaUlBQWlJO0tBQUU7SUFDakk7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsV0FBVyxFQUFFLGdFQUFnRTtnQkFDN0UsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNELElBQUk7SUFDSiw4QkFBOEI7SUFDOUIsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUiwyQkFBMkI7SUFDM0IsNEZBQTRGO0lBQzVGLG9CQUFvQjtJQUNwQix1QkFBdUI7SUFDdkIsU0FBUztJQUNULE9BQU87SUFDUCxLQUFLO0lBQ0w7UUFDRSxNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUU7WUFDUCw0Q0FBNEM7WUFDNUMsNkNBQTZDO1lBQzdDLDZFQUE2RTtTQUM5RTtLQUNGO0NBQ0YsQ0FBQyJ9