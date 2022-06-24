const blockedResourcesTypes = [
    'beacon',
    'csp_report',
    'font',
    'image',
    'imageset',
    'main_frame',
    'media',
    'object',
    'object_subrequest',
    'ping',
    'sub_frame',
    'speculative',
    'web_manifest',
    'xbl',
    'xml_dtd',
    'xslt',
    'other'
]
const skippedScriptResources = [
    'googletagmanager',
    'google-analytics',
    'google'
]

module.exports = { blockedResourcesTypes, skippedScriptResources }