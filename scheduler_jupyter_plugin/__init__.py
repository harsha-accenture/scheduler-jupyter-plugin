# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


try:
    from ._version import __version__
except ImportError:
    # Fallback when using the package in dev mode without installing
    # in editable mode with pip. It is highly recommended to install
    # the package from a stable release or in editable mode: https://pip.pypa.io/en/stable/topics/local-project-installs/#editable-installs
    import warnings

    warnings.warn("Importing 'scheduler_jupyter_plugin' outside a proper installation.")
    __version__ = "dev"
import logging

from .handlers import setup_handlers, SchedulerPluginConfig


def _jupyter_labextension_paths():
    return [{"src": "labextension", "dest": "scheduler-jupyter-plugin"}]


def _jupyter_server_extension_points():
    return [{"module": "scheduler_jupyter_plugin"}]


def _link_jupyter_server_extension(server_app):
    plugin_config = SchedulerPluginConfig.instance(parent=server_app)
    if plugin_config.log_path != "":
        file_handler = logging.handlers.RotatingFileHandler(
            plugin_config.log_path, maxBytes=2 * 1024 * 1024, backupCount=5
        )
        file_handler.setFormatter(
            logging.Formatter("[%(levelname)s %(asctime)s %(name)s] %(message)s")
        )
        server_app.log.addHandler(file_handler)


def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension.

    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    setup_handlers(server_app.web_app)
    name = "scheduler_jupyter_plugin"
    server_app.log.info(f"Registered {name} server extension")


# For backward compatibility with notebook server - useful for Binder/JupyterHub
load_jupyter_server_extension = _load_jupyter_server_extension
